SELECT
	*
FROM
	PRACTICE01_PEOPLE_ZZZ
/*BEGIN*/
WHERE
	/*IF keyword == null || keyword != ""*/
	LOWER(PEOPLE_CODE) LIKE LOWER('%' || /*keyword*/NULL || '%')
	OR LOWER(FULL_NAME) LIKE LOWER('%' || /*keyword*/NULL || '%')
	OR LOWER(EMAIL) LIKE LOWER('%' || /*keyword*/NULL || '%')
	OR LOWER(PHONE) LIKE LOWER('%' || /*keyword*/NULL || '%')
	OR LOWER(STATUS) LIKE LOWER('%' || /*keyword*/NULL || '%')
	/*END*/
/*END*/
ORDER BY
	PEOPLE_ID ASC

 