import { Repository } from 'typeorm';
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Columns from '../domain/column.entity';

@CustomRepository(Columns)
export default class ColumnsRepository extends Repository<Columns> {
  public async findColumn(tableId: number) {
    const querybuilder = this.createQueryBuilder('column')
      .select([
        'column.id',
        'column.key',
        'column.physicalName',
        'column.logicalName',
        'column.comment',
        'column.dataType',
        'column.isNull',
        'column.option',
        'table.id',
        'create_user.nickname',
        'create_user.email',
        'create_user.profile',
        'modify_user.nickname',
        'modify_user.email',
        'modify_user.profile',
      ])
      .leftJoin('column.table', 'table')
      .leftJoin('column.create_user', 'create_user')
      .leftJoin('column.modify_user', 'modify_user')
      .where('column.table = :tableId', { tableId });
    return await querybuilder.getManyAndCount();
  }

  public async findColumnByNameAndTable(columnName: string, tableId: number) {
    return this.createQueryBuilder('column')
      .select([
        'column.id',
        'table.id',
        'column.key',
        'column.physicalName',
        'column.logicalName',
        'column.comment',
        'column.dataType',
        'column.isNull',
        'column.option',
      ])
      .leftJoin('column.table', 'table')
      .where('column.name = :columnName', { columnName })
      .andWhere('column.table = :tableId', { tableId })
      .getOne();
  }

  public async findColumnById(id: number) {
    return this.createQueryBuilder('column')
      .select([
        'column.id',
        'table.id',
        'column.key',
        'column.physicalName',
        'column.logicalName',
        'column.comment',
        'column.dataType',
        'column.isNull',
        'column.option',
      ])
      .leftJoin('column.table', 'table')
      .where('column.id = :id', { id })
      .getOne();
  }

  public async findPK(tableId: number) {
    return this.createQueryBuilder('column')
      .select([
        'column.id',
        'column.key',
        'column.physicalName',
        'column.logicalName',
        'column.comment',
        'column.dataType',
        'column.isNull',
        'column.option',
      ])
      .leftJoin('column.table', 'table')
      .where('table.id = :tableId', { tableId })
      .where("column.key = 'PK'")
      .getOne();
  }

  public async findFK(tableId: number) {
    return this.createQueryBuilder('column')
      .select([
        'column.id',
        'column.key',
        'column.physicalName',
        'column.logicalName',
        'column.comment',
        'column.dataType',
        'column.isNull',
        'column.option',
      ])
      .leftJoin('column.table', 'table')
      .where('table.id = :tableId', { tableId })
      .where("column.key = 'FK'")
      .getCount();
  }
}