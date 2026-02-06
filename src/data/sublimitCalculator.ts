import { SubLimit } from './chiExclusions';
import { formatCurrency } from './healthServices';

export interface SubLimitChange {
  subLimit: SubLimit;
  newLimitSAR: number;
  newCopaymentPercent: number;
}

export interface SubLimitImpact {
  benefitName: string;
  benefitNameAr: string;
  currentLimit: number;
  newLimit: number;
  limitChangePercent: number;
  currentCopay: number;
  newCopay: number;
  currentCostPerThousand: number;
  newCostPerThousand: number;
  costChangePerThousand: number;
  premiumImpactPercent: number;
  premiumImpactSAR: number;
  direction: 'increase' | 'decrease' | 'neutral';
}

export interface PortfolioImpact {
  totalPremiumImpactPercent: number;
  totalPremiumImpactSAR: number;
  totalAdditionalCostPerThousand: number;
  newPremiumPerMember: number;
  individualImpacts: SubLimitImpact[];
}

/**
 * Calculate the cost impact when changing a sub-limit
 * Uses actuarial principles:
 * - Higher limits = higher expected claims
 * - Lower copayments = higher utilization
 * - Uses elasticity factors for demand response
 */
export function calculateSubLimitImpact(
  change: SubLimitChange,
  memberCount: number = 1000,
  basePremiumSAR: number = 5000
): SubLimitImpact {
  const { subLimit, newLimitSAR, newCopaymentPercent } = change;
  
  // Calculate current expected cost per 1000 members
  const currentUtilization = subLimit.utilizationRate / 100;
  const currentEffectiveClaim = Math.min(subLimit.avgClaimSAR, subLimit.currentLimitSAR);
  const currentCopayFactor = 1 - (subLimit.copaymentPercent / 100);
  const currentCostPerThousand = currentUtilization * currentEffectiveClaim * currentCopayFactor * 1000;
  
  // Calculate new expected cost
  // Elasticity: how much utilization changes when limits change
  const limitElasticity = 0.15; // 15% increase in utilization per 100% limit increase
  const copayElasticity = 0.25; // 25% increase in utilization per 10% copay decrease
  
  const limitChangeRatio = newLimitSAR / subLimit.currentLimitSAR;
  const copayChangeRatio = (subLimit.copaymentPercent - newCopaymentPercent) / 10;
  
  // Utilization response to changes
  const utilizationMultiplier = 1 + 
    (limitElasticity * (limitChangeRatio - 1)) + 
    (copayElasticity * copayChangeRatio);
  
  const newUtilization = Math.min(Math.max(currentUtilization * utilizationMultiplier, 0), 1);
  const newEffectiveClaim = Math.min(subLimit.avgClaimSAR * (1 + 0.05 * (limitChangeRatio - 1)), newLimitSAR);
  const newCopayFactor = 1 - (newCopaymentPercent / 100);
  const newCostPerThousand = newUtilization * newEffectiveClaim * newCopayFactor * 1000;
  
  // Calculate cost change
  const costChangePerThousand = newCostPerThousand - currentCostPerThousand;
  
  // Apply risk loading (10%) and admin loading (12%)
  const loadedCostChange = costChangePerThousand * 1.10 * 1.12;
  const premiumImpactPerMember = loadedCostChange / 1000;
  const premiumImpactPercent = (premiumImpactPerMember / basePremiumSAR) * 100;
  
  return {
    benefitName: subLimit.benefit,
    benefitNameAr: subLimit.benefitAr,
    currentLimit: subLimit.currentLimitSAR,
    newLimit: newLimitSAR,
    limitChangePercent: ((newLimitSAR - subLimit.currentLimitSAR) / subLimit.currentLimitSAR) * 100,
    currentCopay: subLimit.copaymentPercent,
    newCopay: newCopaymentPercent,
    currentCostPerThousand: Math.round(currentCostPerThousand),
    newCostPerThousand: Math.round(newCostPerThousand),
    costChangePerThousand: Math.round(costChangePerThousand),
    premiumImpactPercent: Math.round(premiumImpactPercent * 100) / 100,
    premiumImpactSAR: Math.round(premiumImpactPerMember),
    direction: premiumImpactPerMember > 5 ? 'increase' : premiumImpactPerMember < -5 ? 'decrease' : 'neutral'
  };
}

/**
 * Calculate portfolio-wide impact of multiple sub-limit changes
 */
export function calculatePortfolioImpact(
  changes: SubLimitChange[],
  memberCount: number = 1000,
  basePremiumSAR: number = 5000
): PortfolioImpact {
  const individualImpacts = changes.map(change => 
    calculateSubLimitImpact(change, memberCount, basePremiumSAR)
  );
  
  const totalPremiumImpactSAR = individualImpacts.reduce(
    (sum, impact) => sum + impact.premiumImpactSAR, 0
  );
  
  const totalPremiumImpactPercent = (totalPremiumImpactSAR / basePremiumSAR) * 100;
  
  const totalAdditionalCostPerThousand = individualImpacts.reduce(
    (sum, impact) => sum + impact.costChangePerThousand, 0
  );
  
  return {
    totalPremiumImpactPercent: Math.round(totalPremiumImpactPercent * 100) / 100,
    totalPremiumImpactSAR: Math.round(totalPremiumImpactSAR),
    totalAdditionalCostPerThousand: Math.round(totalAdditionalCostPerThousand),
    newPremiumPerMember: basePremiumSAR + totalPremiumImpactSAR,
    individualImpacts
  };
}

export interface ExclusionImpactResult {
  // Basic metrics
  premiumImpactPercent: number;
  premiumImpactSAR: number;
  annualCostPerThousand: number;
  
  // New actuarial metrics
  pmpmCost: number;              // Per Member Per Month cost impact
  grossCostIncrease: number;     // Upfront total cost before adjustments
  netCostImpact: number;         // After accounting for avoided costs
  costPerInsured: number;        // Foundation for contribution adjustment
  
  // Sensitivity ranges
  sensitivity: {
    bestCase: { pmpm: number; annual: number; percent: number };
    expected: { pmpm: number; annual: number; percent: number };
    worstCase: { pmpm: number; annual: number; percent: number };
  };
}

/**
 * Predict impact of adding an exclusion as a benefit
 * Now includes comprehensive actuarial metrics
 */
export function predictExclusionAdditionImpact(
  prevalencePerThousand: number,
  avgTreatmentCostSAR: number,
  utilizationRate: number = 0.65,
  basePremiumSAR: number = 5000
): ExclusionImpactResult {
  const expectedClaimsPerThousand = prevalencePerThousand * utilizationRate;
  const annualCostPerThousand = expectedClaimsPerThousand * avgTreatmentCostSAR;
  
  // Gross cost (before any adjustments)
  const grossCostIncrease = annualCostPerThousand;
  
  // Net cost impact (accounting for avoided costs - estimated 8% savings from early intervention)
  const avoidedCostFactor = 0.08;
  const netCostImpact = annualCostPerThousand * (1 - avoidedCostFactor);
  
  // Risk loading (15%) and admin loading (12%)
  const loadedCost = netCostImpact * 1.15 * 1.12;
  const premiumImpactSAR = loadedCost / 1000;
  const premiumImpactPercent = (premiumImpactSAR / basePremiumSAR) * 100;
  
  // PMPM (Per Member Per Month) cost
  const pmpmCost = premiumImpactSAR / 12;
  
  // Cost per insured (same as premium impact per member)
  const costPerInsured = premiumImpactSAR;
  
  // Sensitivity analysis (±25% variance for utilization uncertainty)
  const varianceFactor = 0.25;
  
  const bestCaseAnnual = premiumImpactSAR * (1 - varianceFactor);
  const worstCaseAnnual = premiumImpactSAR * (1 + varianceFactor);
  
  const sensitivity = {
    bestCase: {
      pmpm: Math.round((bestCaseAnnual / 12) * 100) / 100,
      annual: Math.round(bestCaseAnnual),
      percent: Math.round((bestCaseAnnual / basePremiumSAR) * 100 * 100) / 100
    },
    expected: {
      pmpm: Math.round(pmpmCost * 100) / 100,
      annual: Math.round(premiumImpactSAR),
      percent: Math.round(premiumImpactPercent * 100) / 100
    },
    worstCase: {
      pmpm: Math.round((worstCaseAnnual / 12) * 100) / 100,
      annual: Math.round(worstCaseAnnual),
      percent: Math.round((worstCaseAnnual / basePremiumSAR) * 100 * 100) / 100
    }
  };
  
  return {
    premiumImpactPercent: Math.round(premiumImpactPercent * 100) / 100,
    premiumImpactSAR: Math.round(premiumImpactSAR),
    annualCostPerThousand: Math.round(annualCostPerThousand),
    pmpmCost: Math.round(pmpmCost * 100) / 100,
    grossCostIncrease: Math.round(grossCostIncrease),
    netCostImpact: Math.round(netCostImpact),
    costPerInsured: Math.round(costPerInsured),
    sensitivity
  };
}
