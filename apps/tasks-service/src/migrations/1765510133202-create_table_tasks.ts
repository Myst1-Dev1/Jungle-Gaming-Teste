import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableTasks1765510133202 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'deadline',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'priority',
            type: 'varchar',
            length: '10',
            default: `'LOW'`,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
            default: `'TODO'`,
          },
          {
            name: 'assigned_user_ids',
            type: 'uuid',
            isArray: true,
            default: "'{}'",
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
