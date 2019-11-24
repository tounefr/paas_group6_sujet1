create table if not exists message
(
  id      serial not null
    constraint message_pk
      primary key,
  content text
);
insert into message (id, content) VALUES(1, 'Hello world') ON CONFLICT DO NOTHING;
