# Ressources:

# products list (SKU List)

## /api/product
* verb: GET
* params: none
* Example:
  * curl --verbose -X GET "http://127.0.0.1:8000/api/product" --header "Accept: application/json"
* response:
  * 200: {"status":true,"data":$SKU_LIST]}
  * (4|5)xx: {"status":false,"error":$MSG}

## /api/sound/$SKU/preview
* verb: GET
* params:
  * $SKU: in path
* Example:
  * curl --verbose -X GET "http://127.0.0.1:8000/api/sound/com.tralalere.codedj.pop.000/preview" --header "Accept: application/json"

## /api/sound/$SKU
* verb: GET
* Auth: Header("Authorization: Bearer $TOKEN)
* params:
  * $SKU: in path
* Example:
  * curl --verbose -X GET "http://127.0.0.1:8000/api/sound/com.tralalere.codedj.pop.000/preview" --header "Accept: application/json" --header "Authorization: Bearer $TOKEN"

## /api/receipt
* verb: POST
* params:
    * body: json paylod (receipt)
