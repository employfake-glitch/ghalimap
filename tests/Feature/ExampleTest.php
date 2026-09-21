<?php
namespace Tests\Feature;
use Tests\TestCase;
class ExampleTest extends TestCase{public function test_home_page_is_available():void{$this->get('/')->assertOk();}public function test_location_route_is_available():void{$this->get('/city/tehran/east-tehran')->assertStatus(200);}}