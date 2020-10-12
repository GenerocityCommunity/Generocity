CREATE TABLE public.users (
	"_id" serial NOT NULL,
	"email" varchar UNIQUE NOT NULL,
	"firstName" varchar (50) NOT NULL,
	"lastName" varchar (50) NOT NULL,
  "password" varchar NOT NULL,
  "points" integer,
  "address_id" bigint NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.address (
  "_id" serial NOT NULL,
  "zipcode" integer NOT NULL,
  "street" varchar NOT NULL,
  "city" varchar NOT NULL,
  "state" varchar NOT NULL,
  "latitude" numeric,
  "longitude"numeric,
  CONSTRAINT "address_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.sessions (
  "_id" serial NOT NULL,
  "ssid" varchar NOT NULL,
  "created_At" DATE NOT NULL,
  "user_id" int NOT NULL,
  "expiration" int NOT NULL,
CONSTRAINT "sessions_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.items (
  "_id" serial NOT NULL,
  "title" varchar NOT NULL,
  "description" varchar (100) NOT NULL,
  "image" varchar NOT NULL,
  "category" varchar NOT NULL,
  "status" BOOLEAN,
  "user_id" bigint NOT NULL,
  "item_latitude" numeric,
  "item_longitude" numeric,
    CONSTRAINT "items_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);




 ALTER TABLE public.users ADD FOREIGN KEY ("address_id") REFERENCES public.address("_id");
 ALTER TABLE public.items ADD CONSTRAINT "items_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
 ALTER TABLE public.sessions ADD FOREIGN KEY ("user_id") REFERENCES public.users("_id");

 INSERT INTO public.address VALUES (1, 92663, '123 daisy lane', 'oc', 'california', 37.4224764, -122.0842499);
 INSERT INTO public.address VALUES (2, 92663, '123 orchid lane', 'los angeles', 'california', 37.4224764, -122.0842499);
 INSERT INTO public.address VALUES (3, 92663, '123 lily lane', 'sb', 'california', 37.4224764, -122.0842499);
 INSERT INTO public.address VALUES (4, 92663, '123 basil lane', 'nyc', 'ny', 37.4224764, -122.0842499);

 INSERT INTO public.users VALUES (1, 'cc2368@cornell.edu', 'Catherine', 'Chiu', 'helloworld', 500, 1);
 INSERT INTO public.users VALUES (2, 'jm@gmail.com', 'John', 'Madrigal', 'helloworld', 500, 2);
 INSERT INTO public.users VALUES (3, 'mh@gmail.com', 'Michelle', 'Holland', 'helloworld', 500, 3);
 INSERT INTO public.users VALUES (4, 'sk@gmail.com', 'Serena', 'Kuo', 'helloworld',  500, 4);

 INSERT INTO public.items VALUES (1, 'fiddle leaf fig', 'lovely green addition to your home', 'https://cdn.shopify.com/s/files/1/0013/3529/6118/products/Kent-48-3265.048-WH_Fiddle-Leaf-Fig-Tree-14.jpg?v=1590447682', 'home goods', FALSE, 1, 37.4224764, -122.0842499);
 INSERT INTO public.items VALUES (2, 'monstera leaf', 'lovely green addition to your home', 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_monstera_variant_medium_grant_cream_54108884-3d3d-44f4-9c34-d741345067ab_1200x.jpg?v=1589821773', 'home goods', FALSE, 1, 37.4224764, -122.0842499);
 INSERT INTO public.items VALUES (3, 'bamboo palm', 'lovely green addition to your home', 'https://media1.popsugar-assets.com/files/thumbor/McrVxuoObTXB5p7BSHfDCdoQotY/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/05/06/738/n/1922794/8c6c0293eb07c93e_netimg20N8zS/i/Potted-Bamboo-Palm-Indoor-Plant.jpg', 'home goods', FALSE, 1, 37.4224764, -122.0842499);
 INSERT INTO public.items VALUES (4, 'orchid', 'lovely green addition to your home', 'https://bagoys.imgix.net/images/itemVariation/Screen-Shot-2013-04-09-at-41516-PM-18092864422.png?auto=format&w=375&h=450&fit=crop', 'home goods', FALSE, 1, 37.4224764, -122.0842499);

 INSERT INTO public.sessions VALUES (1, 'cookie', '2020-07-27', 1, 500000);

 select setval('public.users__id_seq', 5, false);
 select setval('public.address__id_seq', 5, false);
 select setval('public.items__id_seq', 5, false);
  select setval('public.sessions__id_seq', 2, false);

