const records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: 'jack@example.com' },
    { id: 2, username: 'jacks', password: 'd', displayName: 'Jill', emails: 'jack1@example.com' },
    { id: 3, username: 'audit', password: 'd', displayName: 'Audit', emails: 'jill@example.com' }
]

exports.findById = (id, cb) => {
  process.nextTick(() => {
    let idx = id - 1
    records[idx] ? cb(null, records[idx]) : cb(new Error('User ' + id + ' does not exist'))
  })
}

exports.findByUsername = (username, cb) => {
  process.nextTick(() => {
    for (let i = 0, len = records.length; i < len; i++) {
      let record = records[i]
      if (record.username === username) {
        return cb(null, record)
      }
    }
    return cb(null, null)
  })
}
