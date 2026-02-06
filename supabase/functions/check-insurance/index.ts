import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Use staging URL as provided
const CHI_API_URL = 'https://apis-staging.chi.gov.sa/check-insurance/v1/checkinsurancev2';
const CHI_API_KEY = Deno.env.get('CHI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate API key is configured
    if (!CHI_API_KEY) {
      console.error('CHI_API_KEY is not configured');
      return new Response(
        JSON.stringify({ 
          error: 'Service configuration error', 
          isInsured: false,
          message: 'خدمة التحقق غير مهيأة. يرجى التواصل مع مدير النظام.',
          alternativeLink: 'https://www.chi.gov.sa/Pages/InsuredQuery.aspx'
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { systemType, key } = await req.json();

    console.log(`Checking insurance for systemType: ${systemType}, key: ${key}`);

    if (!systemType || !key) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: systemType and key' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate systemType
    const validSystemTypes = [1, 2, 3, 4];
    if (!validSystemTypes.includes(Number(systemType))) {
      return new Response(
        JSON.stringify({ error: 'Invalid systemType. Must be 1 (HIDP), 2 (VIDP), 3 (SCTH), or 4 (UIDP)' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Build URL with query parameters
    const url = `${CHI_API_URL}?systemType=${systemType}&key=${encodeURIComponent(key)}`;
    
    console.log(`Calling CHI API: ${url}`);

    // Try with API key in header (common pattern for many APIs)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'API_KEY': CHI_API_KEY,
        'x-api-key': CHI_API_KEY,
        'Authorization': `Bearer ${CHI_API_KEY}`,
      },
    });

    console.log(`CHI API response status: ${response.status}`);
    console.log(`CHI API response headers:`, JSON.stringify(Object.fromEntries(response.headers.entries())));

    // Get the raw response text first
    const responseText = await response.text();
    console.log(`CHI API raw response (first 500 chars): ${responseText.substring(0, 500)}`);

    // If still getting 403, try with API key in URL as fallback
    if (response.status === 403) {
      console.log('Got 403, trying with API key in URL...');
      
      const urlWithKey = `${CHI_API_URL}?systemType=${systemType}&key=${encodeURIComponent(key)}&API_KEY=${CHI_API_KEY}`;
      
      const retryResponse = await fetch(urlWithKey, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'CHI-Insurance-Checker/1.0',
        },
      });

      console.log(`CHI API retry response status: ${retryResponse.status}`);
      
      const retryText = await retryResponse.text();
      console.log(`CHI API retry response (first 500 chars): ${retryText.substring(0, 500)}`);

      // Check if still HTML error
      if (retryText.trim().startsWith('<!') || retryText.trim().startsWith('<html') || retryResponse.status === 403) {
        console.error('CHI API still returning 403 or HTML after retry');
        return new Response(
          JSON.stringify({ 
            error: 'CHI API access restricted', 
            isInsured: false,
            status: retryResponse.status,
            message: 'خدمة التحقق من التأمين تتطلب صلاحيات خاصة من مجلس الضمان الصحي. يرجى التواصل مع CHI للحصول على مفتاح API للإنتاج.',
            alternativeLink: 'https://www.chi.gov.sa/Pages/InsuredQuery.aspx'
          }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Try to parse retry response
      try {
        const data = JSON.parse(retryText);
        return new Response(
          JSON.stringify(data),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      } catch {
        return new Response(
          JSON.stringify({ 
            error: 'Invalid response from CHI API', 
            isInsured: false,
            rawResponse: retryText.substring(0, 200)
          }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    // Check if response is HTML (error page)
    if (responseText.trim().startsWith('<!') || responseText.trim().startsWith('<html')) {
      console.error('CHI API returned HTML instead of JSON');
      return new Response(
        JSON.stringify({ 
          error: 'CHI API returned an error page', 
          isInsured: false,
          message: 'الخدمة غير متاحة حالياً، يرجى المحاولة لاحقاً أو زيارة موقع المجلس مباشرة',
          alternativeLink: 'https://www.chi.gov.sa/Pages/InsuredQuery.aspx'
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid response from CHI API', 
          isInsured: false,
          rawResponse: responseText.substring(0, 200)
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    console.log(`CHI API parsed response:`, JSON.stringify(data));

    return new Response(
      JSON.stringify(data),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: unknown) {
    console.error('Error calling CHI API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to check insurance status', 
        details: errorMessage,
        isInsured: false,
        message: 'حدث خطأ أثناء الاتصال بخدمة التحقق. يرجى المحاولة لاحقاً.',
        alternativeLink: 'https://www.chi.gov.sa/Pages/InsuredQuery.aspx'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
