<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
class CarpetCleaning extends Model { protected $fillable=['city_id','name','slug','phone','address','description','is_active']; protected function casts(): array { return ['is_active'=>'boolean']; } public function city(): BelongsTo { return $this->belongsTo(City::class); } public function locations(): BelongsToMany { return $this->belongsToMany(Location::class); } }