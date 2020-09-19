import { Pool } from 'pg';

export async function newPg({ config }) {
  const _pool = new Pool(config.pg.poolOptions);

  const sampleOps = async(client) => {
    // do something using client
    Promise.resolve(true);
  }

  const txn = async(ops = sampleOps) => {
    const _client = await _pool.connect();
    const db = { _client, ...extendDb(_client) };
    try {
      await _client.query('BEGIN');
      await ops(db);
      await _client.query('COMMIT');
    } catch (err) {
      await _client.query('ROLLBACK');
      throw err;
    } finally {
      _client.release();
    }
  };

  return {
    _pool,
    ...extendDb(_pool),
    txn,
  };
}

export function extendDb(db) {

  const placeHolder = (idx) => {
    return '$' + idx;
  };

  const query = async (text, values = []) => {
    let result, error;
    try {
      result = await db.query(text, values);
    } catch (err) {
      error = err;
    }
    return { result, error };
  };

  const queryPrepared = async ({ name, text, values }) => {
    let result, error;
    try {
      result = await db.query({ name, text, values });
    } catch (err) {
      error = err;
    }
    return { result, error };
  };

  const findOne = async (table, field, value) => {
    const { result, error } = await db.queryPrepared({
      name: table + '-find-one-by-' + field,
      text: `SELECT * FROM ${table} WHERE ${field} = ` + placeHolder(1),
      values: [ value ],
    });
    return { result, error, row: result.rows[0] || null };
  };

  const insertOne = async(tableName, row) => {
    const fields = [], params = [], placeHolders = [];
    Object.entries(row).forEach(([ field , value ]) => {
      fields.push(field);
      params.push(value);
      placeHolders.push(placeHolder(params.length));
    });
    // param placeholders: $1, $2, etc.
    const text = 'INSERT INTO ' + tableName + ' (' + fields.join(', ') + ') '
      + 'VALUES (' + placeHolders.join(', ') + ') '
      + 'RETURNING *';
    return query(text, params);
  };

  const updateOne = async(tableName, condition, row, limit = 1) => {
    const assignments = [], where = [], params = [];
    Object.entries(row).forEach(([ field, value ]) => {
      params.push(value);
      assignments.push(field + ' = ' + placeHolder(params.length));
    });
    Object.entries(condition).forEach(([ field , value ]) => {
      params.push(value);
      where.push(field + ' = ' + placeHolder(params.length));
    });
    const assignmentsStr = assignments.join(', ');
    const whereStr = where ? ' WHERE ' + where.join(' AND ') : '';
    const limitStr = limit ? `LIMIT ${limit}` : '';
    const text = `UPDATE ${tableName} SET ${assignmentsStr} ${whereStr} ${limitStr}`;
    return query(text, params);
  };

  const deleteOne = async(tableName, condition, limit  = 1) => {
    const where = [], params = [];
    Object.entries(condition).forEach(([field , value]) => {
      params.push(value);
      where.push(field + ' = ' + placeHolder(params.length));
    });
    const whereStr = where ? 'WHERE ' + where.join(' AND ') : '';
    const limitStr = limit ? `LIMIT ${limit}` : '';
    const text = `DELETE FROM ${tableName} ${whereStr} ${limitStr}`;
    return query(text, params);
  };

  return {
    query,
    queryPrepared,
    findOne,
    insertOne,
    updateOne,
    deleteOne,
  };
}
