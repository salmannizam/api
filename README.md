docker pull mcr.microsoft.com/mssql/server

docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YourPassword123!" -p 1433:1433 --name sql_server_container -d mcr.microsoft.com/mssql/server

docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=MyPassword1!" -p 1433:1433 --name mssql-server -d mcr.microsoft.com/mssql/server:2022-latest
