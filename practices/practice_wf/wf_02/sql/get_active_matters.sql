SELECT 
    m.system_matter_id,
    m.user_data_id,
    m.matter_name,
    m.flow_id,
    m.apply_auth_user_code AS apply_user_cd,
    ml.apply_auth_user_name AS apply_user_name,
    m.apply_date,
    t.node_id,
    t.node_type,
    t.status
FROM 
    imw_t_actv_matter m
JOIN 
    imw_t_actv_task t ON m.system_matter_id = t.system_matter_id
LEFT JOIN 
    imw_t_actv_matter_locale ml ON m.system_matter_id = ml.system_matter_id 
    AND ml.locale_id = /*locale_id*/'ja'
WHERE 
    m.flow_id = /*flow_id*/'wf_zzz_01'
ORDER BY 
    m.apply_date DESC
