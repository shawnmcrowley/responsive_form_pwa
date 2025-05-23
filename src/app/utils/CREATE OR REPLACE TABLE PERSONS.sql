-- Create new table with all columns including the new created_date
CREATE TABLE DB_TEST.SCHEMA_TEST.PERSONS_DATA (
    ID NUMBER(38,0) NOT NULL autoincrement start 1 increment 1 noorder,
    FIRSTNAME VARCHAR(255),
    LASTNAME VARCHAR(255),
    EMAIL VARCHAR(255),
    PASSWORD VARCHAR(8),
    DELETED BOOLEAN DEFAULT FALSE,
    CREATED_DATE TIMESTAMP_NTZ DEFAULT SYSDATE() NOT NULL,
    primary key (ID)
);

-- Copy data from old table to new table
INSERT INTO DB_TEST.SCHEMA_TEST.PERSONS_DATA (
    ID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, DELETED
)
SELECT ID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, DELETED
FROM DB_TEST.SCHEMA_TEST.PERSONS;

-- Drop old table
DROP TABLE DB_TEST.SCHEMA_TEST.PERSONS;

-- Rename new table to original name
ALTER TABLE DB_TEST.SCHEMA_TEST.PERSONS_DATA RENAME TO PERSONS;