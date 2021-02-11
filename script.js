fetch("https://www2.deepl.com/jsonrpc", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:85.0) Gecko/20100101 Firefox/85.0",
        "Accept": "*/*",
        "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
        "Content-type": "application/json"
    },
    "referrer": "https://www.deepl.com/translator",
    "body": `{"jsonrpc":"2.0","method": "LMT_handle_jobs","params":{"jobs":[{"kind":"default","raw_en_sentence":"Тест","raw_en_context_before":[],"raw_en_context_after":[],"preferred_num_beams":4,"quality":"fast"}],"lang":{"user_preferred_langs":["IT","PT","PL","EN","RU"],"source_lang_user_selected":"RU","target_lang":"EN"},"priority":-1,"commonJobParams":{"regionalVariant":"en-US","formality":null},"timestamp":1613048987877},"id":24430006}`,
    "method": "POST",
    "mode": "cors"
});