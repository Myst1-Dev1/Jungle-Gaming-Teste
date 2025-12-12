import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableComments1765510256380 implements MigrationInterface {
  name = 'CreateTableComments1765510256380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE comments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        task_id UUID NOT NULL,
        user_id UUID NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),

        CONSTRAINT fk_comments_task
          FOREIGN KEY (task_id)
          REFERENCES tasks(id)
          ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE comments;`);
  }
}
