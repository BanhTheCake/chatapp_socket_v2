-   set Foreign key nhưng trong database vẫn phải thêm kiểu dữ liệu đó vào, nó không tự thêm

-- fix:

1. Loading
1. shift + enter để xuống dòng

"development": {
"username": "root",
"password": null,
"database": "sequelize-socket",
"host": "127.0.0.1",
"dialect": "mysql",
"port": 3306,
"logging": false
},
