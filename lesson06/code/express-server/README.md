# Clean Architecture
layer - слои
responsibility - у каждого своя зона ответсвенности

- domain - entity - с чем мы работаем? С какой сущностью (типы и схемы)

- repository - persistant layer - только хранение - чтение, запись в БД

- service - business logic - if else

- controller - обработка информации

router -> controller -> service -> repository

## Map
https://learn.javascript.ru/map-set