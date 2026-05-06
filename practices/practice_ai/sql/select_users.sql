SELECT
    user_id,
    user_name,
    email,
    department,
    notes
FROM
    ai_zzz_user
/*BEGIN*/
WHERE
    /*IF keyword != null*/
    (user_name LIKE /*keyword*/'%' OR email LIKE /*keyword*/'%')
    /*END*/
/*END*/
ORDER BY
    user_id ASC
