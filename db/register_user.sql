insert into project_users (
    user_email,
    user_password,
    first_name,
    last_name
) values (
    $1,
    $2,
    $3,
    $4
)

returning user_id, user_email, first_name, last_name;