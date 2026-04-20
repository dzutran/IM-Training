const databasePath = 'training/dzu/practices/practice_01/database/';
const schemaName = 'im_db_backup_dev_01';
const db = new SharedDatabase(schemaName);
const user = Contexts.getAccountContext();

function getDataByKeyword(req) {
  try {
    var querry = databasePath + 'practice01PeopleZZZ_GetByKeyword';
    var params = {
      keyword: DbParameter.string(req.keyword)
    }

    var res = db.executeByTemplate(querry, params);
    var data = res.data.map(function (row) {
      return {
        actionUpdate: '',
        actionDelete: '',
        peopleId: row.people_id,
        peopleCode: row.people_code,
        fullName: row.full_name,
        email: row.email,
        phone: row.phone,
        birthDate: Format.fromDate('yyyy/MM/dd', row.birth_date),
        avatarFileId: row.avatar_file_id,
        status: row.status,
        createdAt: row.created_at,
        createdBy: row.created_by,
        updatedAt: row.updated_at,
        updatedBy: row.updated_by
      }
    })
    return {
      isError: res.error,
      type: 'getDataByKeyword',
      data: data
    }
  } catch (e) {
    Debug.console('ZZZ getDataByKeyword error: ' + e)
    return {
      isError: true,
      msg: e.message
    }
  }
}

function insertPeople(req) {
  try {
    var querry = databasePath + 'practice01PeopleZZZ_Insert';
    var params = {
      peopleCode: DbParameter.string(Identifier.get()),
      fullName: DbParameter.string(req.fullName),
      email: DbParameter.string(req.email),
      phone: DbParameter.string(req.phone),
      birthDate: DbParameter.date(Format.toDate('yyyy/MM/dd', req.birthDate)),
      avatarFileId: DbParameter.string(req.avatarFileId),
      status: DbParameter.string(req.status),
      createdAt: DbParameter.timestamp(new Date()),
      createdBy: DbParameter.string(user.userCd),
      updatedAt: DbParameter.timestamp(new Date()),
      updatedBy: DbParameter.string(user.userCd)
    }
    var res = db.executeByTemplate(querry, params);

    return {
      isError: res.error,
      type: 'insertPeople'
    }
  } catch (e) {
    Debug.console('ZZZ insertPeople error: ' + e)
    return {
      isError: true,
      msg: e.message
    }
  }
}

function updatePeople(req) {
  try {
    var querry = databasePath + 'practice01PeopleZZZ_Update';
    var params = {
      peopleCode: DbParameter.string(req.peopleCode),
      fullName: DbParameter.string(req.fullName),
      email: DbParameter.string(req.email),
      phone: DbParameter.string(req.phone),
      birthDate: DbParameter.date(Format.toDate('yyyy/MM/dd', req.birthDate)),
      avatarFileId: DbParameter.string(req.avatarFileId),
      status: DbParameter.string(req.status),
      updatedAt: DbParameter.timestamp(new Date()),
      updatedBy: DbParameter.string(user.userCd)
    }
    var res = db.executeByTemplate(querry, params);

    return {
      isError: res.error,
      type: 'updatePeople'
    }
  } catch (e) {
    Debug.console('ZZZ updatePeople error: ' + e)
    return {
      isError: true,
      msg: e.message
    }
  }
}

function deleteByCode(req) {
  try {
    var querry = databasePath + 'practice01PeopleZZZ_DeleteByCode';
    var params = {
      peopleCode: DbParameter.string(req.peopleCode)
    }
    var res = db.executeByTemplate(querry, params);

    return {
      isError: res.error,
      type: 'deleteByCode'
    }
  } catch (e) {
    Debug.console('ZZZ deleteByCode error: ' + e)
    return {
      isError: true,
      msg: e.message
    }
  }
}