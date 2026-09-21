<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class City extends Model { protected $fillable=['province_id','name','slug']; public function province(): BelongsTo { return $this->belongsTo(Province::class); } public function locations(): HasMany { return $this->hasMany(Location::class); } public function carpetCleanings(): HasMany { return $this->hasMany(CarpetCleaning::class); } }