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