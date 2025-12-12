import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTaskHistory1765510268308 implements MigrationInterface {
  name = 'CreateTableTaskHistory1765510268308';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE task_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        task_id UUID NOT NULL,
        user_id UUID NOT NULL,
        action VARCHAR(255) NOT NULL,
        old_value JSONB,
        new_value JSONB,
        created_at TIMESTAMP DEFAULT NOW(),

        CONSTRAINT fk_history_task
          FOREIGN KEY (task_id)
          REFERENCES tasks(id)
          ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE task_history;`);
  }
}
