CREATE SCHEMA IF NOT EXISTS tflexsoom_dev
    CHARACTER SET = 'utf8mb4'
    COLLATE = 'utf8mb4_general_ci'
;

USE tflexsoom_dev;

CREATE ROLE IF NOT EXISTS 'webapp';

GRANT SELECT, INSERT, UPDATE, CREATE, REFERENCES, INDEX, ALTER, LOCK TABLES, EXECUTE, CREATE VIEW ON * TO `webapp`;

CREATE USER IF NOT EXISTS 'tflexsoom_service' IDENTIFIED BY 'password';

GRANT `webapp` TO 'tflexsoom_service';

SET DEFAULT ROLE `webapp` FOR 'tflexsoom_service';

FLUSH PRIVILEGES;