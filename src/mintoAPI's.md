### Create Tenant Input Data
```
{
            "name": "PatilX Group",
            "description": "Patil Group of companies",
            "created_on": "2018-12-12T13:53:47.000Z",
            "created_by": "uday",
            "modified_on": "2018-12-12T13:53:47.000Z",
            "modified_by": "uday",
            "app_object_id": "t1",
            "additional_info": {}
}
```

Currently this API work with minimum body

```
{
            "additional_info": {}
}
```

I looks that additional_info field has made required and only of type object **{}**

## Equipments CURD

### Issues

* Currently among equipment CURD only **GET LIST** is working. UPDATE ONE & GET ONE & DELETE are creating new equipment. And CREATE is working but when tring to add tenant_id or plant_id it's not working.

### Working

* GET LIST
* CREATE EQUIPMENT **without tenant_id & plant_id**

### NOT Working

* GET ONE
* UPDATE
* DELETE

## Tenant CURD

### Working

* GET LIST
* GET ONE
* CREATE TENANT

### NOT Working

* UPDATE
* DELETE

## Plant CRUD

### Working

* GET LIST
* GET ONE
* CREATE
* DELETE

### NOT WORKING

* UPDATE

## Machines

### Working

* 

