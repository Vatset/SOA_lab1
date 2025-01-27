/*
 * MusicBand API
 * API для управления коллекцией объектов MusicBand и дополнительных операций.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


package org.openapitools.client.api;

import org.openapitools.client.ApiException;
import java.math.BigDecimal;
import org.openapitools.client.model.MusicBand;
import org.openapitools.client.model.MusicBandInput;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * API tests for DefaultApi
 */
@Disabled
public class DefaultApiTest {

    private final DefaultApi api = new DefaultApi();

    /**
     * Среднее количество участников
     *
     * Рассчитывает среднее значение поля &#x60;numberOfParticipants&#x60; для всех групп.
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void bandsAverageNumberOfParticipantsGetTest() throws ApiException {
        BigDecimal response = api.bandsAverageNumberOfParticipantsGet();
        // TODO: test validations
    }

    /**
     * Удалить группы по количеству синглов
     *
     * Удаляет все группы, у которых поле &#x60;singlesCount&#x60; эквивалентно заданному значению.
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void bandsDeleteBySinglesCountDeleteTest() throws ApiException {
        Integer singlesCount = null;
        api.bandsDeleteBySinglesCountDelete(singlesCount);
        // TODO: test validations
    }

    /**
     * Получить список всех групп
     *
     * Возвращает массив объектов MusicBand с поддержкой фильтрации, сортировки и пагинации.
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void bandsGetTest() throws ApiException {
        String filter = null;
        String sort = null;
        Integer page = null;
        Integer size = null;
        List<MusicBand> response = api.bandsGet(filter, sort, page, size);
        // TODO: test validations
    }

    /**
     * Удалить группу по ID
     *
     * Удаляет объект MusicBand по заданному ID.
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void bandsIdDeleteTest() throws ApiException {
        Integer id = null;
        api.bandsIdDelete(id);
        // TODO: test validations
    }

    /**
     * Получить группу по ID
     *
     * Возвращает объект MusicBand по заданному ID.
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void bandsIdGetTest() throws ApiException {
        Integer id = null;
        MusicBand response = api.bandsIdGet(id);
        // TODO: test validations
    }

    /**
     * Обновить группу по ID
     *
     * Обновляет существующий объект MusicBand по ID.
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void bandsIdPutTest() throws ApiException {
        Integer id = null;
        MusicBandInput musicBandInput = null;
        MusicBand response = api.bandsIdPut(id, musicBandInput);
        // TODO: test validations
    }

    /**
     * Группы с меньшим количеством участников
     *
     * Возвращает массив групп, у которых &#x60;numberOfParticipants&#x60; меньше заданного значения.
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void bandsLessThanNumberOfParticipantsGetTest() throws ApiException {
        Integer number = null;
        List<MusicBand> response = api.bandsLessThanNumberOfParticipantsGet(number);
        // TODO: test validations
    }

    /**
     * Добавить новую группу
     *
     * Создает новый объект MusicBand.
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void bandsPostTest() throws ApiException {
        MusicBandInput musicBandInput = null;
        MusicBand response = api.bandsPost(musicBandInput);
        // TODO: test validations
    }

}
