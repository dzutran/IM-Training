SELECT
	*
FROM
	KKF
WHERE
	ROWNUM <= /*row_num*/NULL
	/*IF kkfcdksy != null && kkfcdksy != ''*/
	AND kkfcdksy = /*kkfcdksy*/NULL
	/*END*/

	/*IF kkfnmksy != null && kkfnmksy != ''*/
	AND kkfnmksy = /*kkfnmksy*/NULL
	/*END*/

	/*IF salesname != null && salesname != ''*/
	AND salesname = /*salesname*/NULL
	/*END*/