create table project_users (
    user_id serial primary key,
    user_email varchar(100),
    user_password varchar(250)
)

create table project_posts (
    post_id serial primary key,
    post_title varchar(200),
    post_img text,
    post_text text,
    user_id references project_users(user_id)
)