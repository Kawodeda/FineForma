create table if not exists "User" (
	"Id" int primary key generated always as identity,
	"Username" varchar(100) not null unique,
	"Password" bytea not null,
    "Salt" bytea not null,
	"RegistrationDate" date not null
);

create table if not exists "AssetType" (
	"Id" int primary key generated always as identity,
	"Title" varchar(100) not null unique
);

create table if not exists "StoredResource" (
	"Id" int primary key generated always as identity,
	"StorageId" varchar(100) not null,
	"Name" varchar(100) not null,
	"Thumbnail" bytea null
);

create table if not exists "Asset" (
	"Id" int primary key generated always as identity,
	"Source" int not null unique references "StoredResource" ("Id"),
	"Type" int not null references "AssetType" ("Id")
);

create table if not exists "SavedAsset" (
	"User" int not null references "User" ("Id"),
	"Asset" int not null unique references "Asset" ("Id"),
	primary key("User", "Asset")
);

create table if not exists "Design" (
	"Id" int primary key generated always as identity,
	"Source" int not null unique references "StoredResource" ("Id"),
	"LastEdited" timestamp not null
);

create table if not exists "SavedDesign" (
	"Id" int primary key generated always as identity,
	"User" int not null references "User" ("Id"),
	"Design" int not null unique references "Design" ("Id")
);