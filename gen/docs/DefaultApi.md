# DefaultApi

All URIs are relative to *http://localhost/grammy*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**bandBandIdNominateGenrePost**](DefaultApi.md#bandBandIdNominateGenrePost) | **POST** /band/{band-id}/nominate/{genre} | Номинировать группу на премию |
| [**bandBandIdRewardGenrePost**](DefaultApi.md#bandBandIdRewardGenrePost) | **POST** /band/{band-id}/reward/{genre} | Наградить группу премией |


<a id="bandBandIdNominateGenrePost"></a>
# **bandBandIdNominateGenrePost**
> bandBandIdNominateGenrePost(bandId, genre)

Номинировать группу на премию

Номинирует группу как лучшую в указанном жанре и создает запись в БД.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DefaultApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost/grammy");

    DefaultApi apiInstance = new DefaultApi(defaultClient);
    Integer bandId = 56; // Integer | Идентификатор группы
    MusicGenre genre = MusicGenre.fromValue("RAP"); // MusicGenre | Жанр для номинации
    try {
      apiInstance.bandBandIdNominateGenrePost(bandId, genre);
    } catch (ApiException e) {
      System.err.println("Exception when calling DefaultApi#bandBandIdNominateGenrePost");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **bandId** | **Integer**| Идентификатор группы | |
| **genre** | [**MusicGenre**](.md)| Жанр для номинации | [enum: RAP, HIP_HOP, JAZZ, POST_ROCK] |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Группа успешно номинирована |  -  |
| **404** | Группа не найдена |  -  |
| **400** | Некорректные данные |  -  |

<a id="bandBandIdRewardGenrePost"></a>
# **bandBandIdRewardGenrePost**
> bandBandIdRewardGenrePost(bandId, genre)

Наградить группу премией

Награждает группу как лучшую в указанном жанре и создает запись в БД.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DefaultApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost/grammy");

    DefaultApi apiInstance = new DefaultApi(defaultClient);
    Integer bandId = 56; // Integer | Идентификатор группы
    MusicGenre genre = MusicGenre.fromValue("RAP"); // MusicGenre | Жанр для награждения
    try {
      apiInstance.bandBandIdRewardGenrePost(bandId, genre);
    } catch (ApiException e) {
      System.err.println("Exception when calling DefaultApi#bandBandIdRewardGenrePost");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **bandId** | **Integer**| Идентификатор группы | |
| **genre** | [**MusicGenre**](.md)| Жанр для награждения | [enum: RAP, HIP_HOP, JAZZ, POST_ROCK] |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Группа успешно награждена |  -  |
| **404** | Группа не найдена |  -  |
| **400** | Некорректные данные |  -  |

