-- DB scheme for antique-wolf 1.0
-- syntax is valid for PostgreSQL
-- last revision: 2023-02-19

BEGIN TRANSACTION;

DROP TABLE IF EXISTS "wolf_items";
CREATE TABLE "wolf_items" (
	"id"    SERIAL PRIMARY KEY,
	"description"   varchar(100) NOT NULL,
	"price" int4 NOT NULL,
	"image" varchar(255) NOT NULL,
	"created"   timestamp NOT NULL,
	"edited"    timestamp NOT NULL,
	"author"    varchar(255) NOT NULL,
	"valid" boolean NOT NULL
);

INSERT INTO "wolf_items"("description", "price", "image", "created", "edited", "author", "valid") VALUES 
    ('Známka Masaryk', 5, '/test/znamka.jpg', now(), now(), 'ellrohir@seznam.cz', true),
    ('Mince zlatá', 10, '/test/mince.jpg', now(), now(), 'ellrohir@seznam.cz', true),
    ('Stará kniha', 100, '/test/kniha.jpg', now(), now(), 'ellrohir@seznam.cz', true),
    ('Starožitná porcelánová váza', 250, '/test/vaza.jpg', now(), now(), 'ellrohir@seznam.cz', true),
    ('Obraz - krajina', 300, '/test/obraz.jpg', now(), now(), 'ellrohir@seznam.cz', true);

COMMIT;