```mermaid
erDiagram
user {
    int id PK
    created_date timestamp
    updated_data timestamp
    deleted_date timestamp
    string email UK 
    string nick_name UK
    string password
    string refresh_token "optional"
    string puhs_token "optional"
    role ROLE_ENUM
}
post {
    int id PK
    created_date timestamp
    updated_data timestamp
    deleted_date timestamp
    string title
    string content
    string image "optional"
}
board {
    int id PK
    created_date timestamp
    updated_data timestamp
    deleted_date timestamp
    string title
}
like {
    int id PK
    created_date timestamp
    updated_data timestamp
    deleted_date timestamp
}
ROLE_ENUM {
    string ADMIN
    string USER
}
user ||--o{ post : user-post
board ||--o{ post : board-post
like ||--o{ user : like-user
like ||--o{ post : like-post
```