<?php

# SiteConfig
$router->options('/api/siteconfig', 'SiteConfigController@getSuccessResponse');
$router->get('/api/siteconfig', 'SiteConfigController@get');
$router->post('/api/siteconfig', 'SiteConfigController@update');

# Auth
$router->post('/auth/login', 'UserController@login');
$router->options('/auth/register', 'UserController@getSuccessResponse');
$router->post('/auth/register', 'UserController@register');

$router->get('/auth/verify-token', 'UserController@verifyToken');
# Auth > Google
$router->post('/auth/google', 'UserController@googleAuth');

# Profile
$router->options('/api/profile', 'UserController@getSuccessResponse');
$router->get('/api/profile', 'UserController@getMyProfileInfo');
$router->post('/api/profile', 'UserController@updateMyProfileInfo');

# Users
$router->options('/api/users', 'UserController@getSuccessResponse');
$router->get('/api/users', 'UserController@getMany');

$router->options('/api/user/:id', 'UserController@getSuccessResponse');
$router->get('/api/user/:id', 'UserController@getOne');
$router->post('/api/user/:id', 'UserController@updateOne');
$router->delete('/api/user/:id', 'UserController@deleteOne');

# Account
$router->options('/api/accounts', 'AccountController@getSuccessResponse');
$router->get('/api/accounts', 'AccountController@getManyByCurrentUser');

$router->options('/api/account/:id', 'AccountController@getSuccessResponse');
$router->get('/api/account/:id', 'AccountController@getOne');

$router->options('/api/account', 'AccountController@getSuccessResponse');
$router->post('/api/account', 'AccountController@createOne');

# Account > Relate
$router->options('/api/account/relate', 'AccountController@getSuccessResponse');
$router->post('/api/account/relate', 'AccountController@relateUser');
$router->delete('/api/account/relate', 'AccountController@deleteUserRelation');

# Store
$router->options('/api/stores', 'StoreController@getSuccessResponse');
$router->get('/api/stores', 'StoreController@getMany');

$router->options('/api/store', 'StoreController@getSuccessResponse');
$router->post('/api/store', 'StoreController@createOne');

$router->options('/api/store/:id', 'StoreController@getSuccessResponse');
$router->get('/api/store/:id', 'StoreController@getOne');
$router->put('/api/store/:id', 'StoreController@updateOne');
$router->delete('/api/store/:id', 'StoreController@deleteOne');

# Delivery > Create Shipping
$router->options('/api/delivery', 'DeliveryCarrierController@getSuccessResponse');
$router->post('/api/delivery', 'DeliveryCarrierController@sendShipping');
$router->options('/api/delivery', 'DeliveryCarrierController@getSuccessResponse');
$router->get('/api/delivery', 'DeliveryCarrierController@getMany');

# Orders > Get Many
$router->options('/api/orders', 'OrderController@getSuccessResponse');
$router->options('/api/orders/:storeId', 'OrderController@getSuccessResponse');
$router->get('/api/orders/:storeId', 'OrderController@getMany');