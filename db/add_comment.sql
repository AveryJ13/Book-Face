insert into project_comments (
    comment_id,
    comment_text,
    author_firstname,
    author_lastname
) values (
    $1,
    $2,
    $3,
    $4
)