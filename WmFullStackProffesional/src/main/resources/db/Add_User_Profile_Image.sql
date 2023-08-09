ALTER TABLE users
ADD COLUMN profile_image_id VARCHAR(36);

ALTER TABLE users
ADD CONSTRAINT profile_image_id_unique
UNIQUE (profile_image_id);