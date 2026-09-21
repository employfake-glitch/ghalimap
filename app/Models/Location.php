<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
class Location extends Model { protected $fillable=['city_id','name','slug','type']; public function city(): BelongsTo { return $this->belongsTo(City::class); } public function carpetCleanings(): BelongsToMany { return $this->belongsToMany(CarpetCleaning::class); } }