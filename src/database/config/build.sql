BEGIN;

-- Drop existing tables if needed
DROP TABLE IF EXISTS auth CASCADE;
DROP TABLE IF EXISTS beneficiaries CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

-- Create organizations table
CREATE TABLE organizations (
		org_id SERIAL PRIMARY KEY,
		org_name VARCHAR(150) NOT NULL,
		org_address VARCHAR(200),
		contact_email VARCHAR(100),
		phone_number VARCHAR(20)
);

-- Create beneficiaries table with unique constraint on (name, last_name)
CREATE TABLE beneficiaries (
		bid SERIAL PRIMARY KEY,
		org_id INT REFERENCES organizations(org_id) ON DELETE SET NULL,
		first_name VARCHAR(100),
		second_name VARCHAR(100),
		third_name VARCHAR(100),
		last_name VARCHAR(100),
		age INT,
		id_number VARCHAR(30),
		passport VARCHAR(30),
		gender VARCHAR(10),
		address VARCHAR(200),
		phone_number VARCHAR(20),
		rent VARCHAR(50),
		furniture VARCHAR(50),
		clothes VARCHAR(50),
		medical VARCHAR(50),
		pocket_money VARCHAR(50),
		other VARCHAR(50)
);

-- Create auth table for authentication
CREATE TABLE auth (
		id SERIAL PRIMARY KEY,
		org_id INT REFERENCES organizations(org_id) ON DELETE CASCADE,
		username VARCHAR(100) UNIQUE NOT NULL,     -- Unique username for each organization
	    email VARCHAR(255) NOT NULL UNIQUE,
		password_hash VARCHAR(200) NOT NULL,       -- Hashed password for security
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMIT;



