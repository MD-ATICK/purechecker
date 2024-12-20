
export type LanguagesType = 'Java' | 'PHP' | 'Python' | 'C++' | 'Ruby' | 'React' | 'cUrl'

export const languages: LanguagesType[] = ['Java', 'PHP', 'Python', 'Ruby', 'C++', 'React', 'cUrl']

export const codeSnippets: { language: LanguagesType, installs: string[], singleCheck: string, bulkCheck: string }[] = [
    {
        language: 'cUrl',
        installs: [],
        singleCheck: `curl -X GET 'https://purechecker.com/api/v1/single-check?email=example@gmail.com'`,
        bulkCheck: `curl -X POST 'https://purechecker.com/api/v1/bulk-check'\n-H 'Content-Type: application/json'\n-H 'x-user-id: YOUR_USER_ID'\n-H 'x-secret-key: YOUR_SECRET_KEY'\n-d '[\"example1@gmail.com\", \"example2@gmail.com\"]'`
    },
    {
        language: 'React',
        installs: [],
        singleCheck: `await fetch('https://purechecker.com/api/v1/single-check?email=example@gmail.com', {\n    method: 'GET', \n    headers: {\n       'Content-Type': 'application/json',\n       'x-user-id': 'YOUR_USER_ID',   // Replace with your actual user ID\n       'x-secret-key': 'YOUR_SECRET_KEY' // Replace with your secret key\n    }\n});`,
        bulkCheck: `await fetch('https://purechecker.com/api/v1/bulk-check', {\n    method: 'POST', \n    headers: {\n       'Content-Type': 'application/json',\n       'x-user-id': 'YOUR_USER_ID',   // Replace with your actual user ID\n       'x-secret-key': 'YOUR_SECRET_KEY' // Replace with your secret key\n    },\n    body: JSON.stringify(['example1@gmail.com', 'example2@gmail.com'])\n});`
    },
    {
        language: 'PHP',
        installs: [],
        singleCheck: `$singleEmailUrl = 'https://purechecker.com/api/v1/single-check?email=example@gmail.com';\n$options = [\n    'http' => [\n        'method'  => 'GET',\n        'header'  => "Content-Type: application/json\r\n" .\n                     "x-user-id: YOUR_USER_ID\r\n" .\n                     "x-secret-key: YOUR_SECRET_KEY\r\n"\n    ]\n];\n$context = stream_context_create($options);\n$response = file_get_contents($singleEmailUrl, false, $context);\necho $response;`,
        bulkCheck: `$bulkEmailUrl = 'https://purechecker.com/api/v1/bulk-check';\n$data = ['example1@gmail.com', 'example2@gmail.com'];\n$options = [\n    'http' => [\n        'method'  => 'POST',\n        'header'  => "Content-Type: application/json\r\n" .\n                     "x-user-id: YOUR_USER_ID\r\n" .\n                     "x-secret-key: YOUR_SECRET_KEY\r\n",\n        'content' => json_encode($data)\n    ]\n];\n$context = stream_context_create($options);\n$response = file_get_contents($bulkEmailUrl, false, $context);\necho $response;`
    },
    {
        language: 'Java',
        installs: [],
        singleCheck: `URL url = new URL("https://purechecker.com/api/v1/single-check?email=example@gmail.com");\nHttpURLConnection connection = (HttpURLConnection) url.openConnection();\nconnection.setRequestMethod("GET");\nconnection.setRequestProperty("Content-Type", "application/json");\nconnection.setRequestProperty("x-user-id", "YOUR_USER_ID");\nconnection.setRequestProperty("x-secret-key", "YOUR_SECRET_KEY");\n\nint responseCode = connection.getResponseCode();\nSystem.out.println("Response Code: " + responseCode);`,
        bulkCheck: `URL url = new URL("https://purechecker.com/api/v1/bulk-check");\nHttpURLConnection connection = (HttpURLConnection) url.openConnection();\nconnection.setRequestMethod("POST");\nconnection.setRequestProperty("Content-Type", "application/json");\nconnection.setRequestProperty("x-user-id", "YOUR_USER_ID");\nconnection.setRequestProperty("x-secret-key", "YOUR_SECRET_KEY");\nconnection.setDoOutput(true);\n\nString jsonBody = "[\"example1@gmail.com\", \"example2@gmail.com\"]";\ntry (OutputStream os = connection.getOutputStream()) {\n    byte[] input = jsonBody.getBytes(StandardCharsets.UTF_8);\n    os.write(input, 0, input.length);\n}\n\nint responseCode = connection.getResponseCode();\nSystem.out.println("Response Code: " + responseCode);`
    },
    {
        language: 'Python',
        installs: [],
        singleCheck: `import requests\nurl = 'https://purechecker.com/api/v1/single-check?email=example@gmail.com'\nheaders = {\n    'Content-Type': 'application/json',\n    'x-user-id': 'YOUR_USER_ID',\n    'x-secret-key': 'YOUR_SECRET_KEY'\n}\nresponse = requests.get(url, headers=headers)\nprint(response.text)`,
        bulkCheck: `import requests\nurl = 'https://purechecker.com/api/v1/bulk-check'\nheaders = {\n    'Content-Type': 'application/json',\n    'x-user-id': 'YOUR_USER_ID',\n    'x-secret-key': 'YOUR_SECRET_KEY'\n}\nemails = ['example1@gmail.com', 'example2@gmail.com']\nresponse = requests.post(url, headers=headers, json=emails)\nprint(response.text)`
    },
    {
        language: 'C++',
        installs: [],
        singleCheck: `#include <iostream>\n#include <string>\n#include <curl/curl.h>\n\nint main() {\n    CURL *curl = curl_easy_init();\n    if(curl) {\n        curl_easy_setopt(curl, CURLOPT_URL, "https://purechecker.com/api/v1/single-check?email=example@gmail.com");\n        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, {"Content-Type: application/json", "x-user-id: YOUR_USER_ID", "x-secret-key: YOUR_SECRET_KEY"});\n        CURLcode res = curl_easy_perform(curl);\n        if(res != CURLE_OK) {\n            std::cerr << "Curl failed: " << curl_easy_strerror(res) << std::endl;\n        }\n        curl_easy_cleanup(curl);\n    }\n    return 0;\n}`,
        bulkCheck: `#include <iostream>\n#include <string>\n#include <curl/curl.h>\n\nint main() {\n    CURL *curl = curl_easy_init();\n    if(curl) {\n        curl_easy_setopt(curl, CURLOPT_URL, "https://purechecker.com/api/v1/bulk-check");\n        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, {"Content-Type: application/json", "x-user-id: YOUR_USER_ID", "x-secret-key: YOUR_SECRET_KEY"});\n        std::string jsonBody = "[\"example1@gmail.com\", \"example2@gmail.com\"]";\n        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonBody.c_str());\n        CURLcode res = curl_easy_perform(curl);\n        if(res != CURLE_OK) {\n            std::cerr << "Curl failed: " << curl_easy_strerror(res) << std::endl;\n        }\n        curl_easy_cleanup(curl);\n    }\n    return 0;\n}`
    },
    {
        language: 'Ruby',
        installs: [],
        singleCheck: `require 'net/http'\nrequire 'uri'\n\nuri = URI.parse("https://purechecker.com/api/v1/single-check?email=example@gmail.com")\nrequest = Net::HTTP::Get.new(uri)\nrequest["Content-Type"] = "application/json"\nrequest["x-user-id"] = "YOUR_USER_ID"\nrequest["x-secret-key"] = "YOUR_SECRET_KEY"\n\nresponse = Net::HTTP.start(uri.hostname, uri.port) {|http| http.request(request)}\nputs response.body`,
        bulkCheck: `require 'net/http'\nrequire 'uri'\nrequire 'json'\n\nuri = URI.parse("https://purechecker.com/api/v1/bulk-check")\nrequest = Net::HTTP::Post.new(uri)\nrequest["Content-Type"] = "application/json"\nrequest["x-user-id"] = "YOUR_USER_ID"\nrequest["x-secret-key"] = "YOUR_SECRET_KEY"\n\nemails = ['example1@gmail.com', 'example2@gmail.com']\nrequest.body = emails.to_json\n\nresponse = Net::HTTP.start(uri.hostname, uri.port) {|http| http.request(request)}\nputs response.body`
    }
];


export const singleResult = `{
    "id": "603d9e8bfc13ae1f7c000001",
    "email": "example1@gmail.com",
    "domain": "gmail.com",
    "reason": "Valid Email",
    "isExist": true,
    "isDisposable": false,
    "isValidSyntax": true,
    "isValidDomain": true,
    "riskLevel": "Low",
    "isDisable": false,
    "is2FA": true,
    "mxRecords": [
        {
            "priority": 10,
            "host": "smtp.gmail.com"
        }
    ],
    "userId": "603d9e8bfc13ae1f7c000002",
    "apiTokenId": "603d9e8bfc13ae1f7c000003",
    "createdAt": "2024-11-30T10:00:00.000Z"
}`

export const bulkResult = `{
results : [
 {
    "id": "603d9e8bfc13ae1f7c000001",
    "email": "example1@gmail.com",
    "domain": "gmail.com",
    "reason": "Valid Email",
    "isExist": true,
    "isDisposable": false,
    "isValidSyntax": true,
    "isValidDomain": true,
    "riskLevel": "Low",
    "isDisable": false,
    "is2FA": true,
    "mxRecords": [
        {
            "priority": 10,
            "host": "smtp.gmail.com"
        }
    ],
    "userId": "603d9e8bfc13ae1f7c000002",
    "apiTokenId": "603d9e8bfc13ae1f7c000003",
    "createdAt": "2024-11-30T10:00:00.000Z"
}
]
}`
