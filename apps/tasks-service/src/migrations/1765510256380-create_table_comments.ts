import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixCommentsColumns1765510256380 implements MigrationInterface {
  name = 'FixCommentsColumns1765510256380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE comments
      RENAME COLUMN user_id TO author_id;
    `);

    await queryRunner.query(`
      ALTER TABLE comments
      RENAME COLUMN message TO content;
    `);

    await queryRunner.query(`
      ALTER TABLE comments
      ALTER COLUMN created_at
      TYPE TIMESTAMP WITH TIME ZONE
      USING created_at AT TIME ZONE 'UTC';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE comments
      RENAME COLUMN author_id TO user_id;
    `);

    await queryRunner.query(`
      ALTER TABLE comments
      RENAME COLUMN content TO message;
    `);

    await queryRunner.query(`
      ALTER TABLE comments
      ALTER COLUMN created_at
      TYPE TIMESTAMP WITHOUT TIME ZONE;
    `);
  }
}
