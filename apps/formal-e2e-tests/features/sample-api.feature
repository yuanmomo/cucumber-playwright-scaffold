Feature: Sample API Testing

  Scenario: Send HTTP request and validate response
    When I send a GET request to "https://api.ip.sb/jsonip"
    Then the response should match the expected JSON file "EXPECTED_RESPONSE.json"