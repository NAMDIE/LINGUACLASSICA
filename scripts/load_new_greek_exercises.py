#!/usr/bin/env python3
"""
Load the 80 new Greek exercises (1-80) into Supabase database.
"""

import json
import requests
import os
import sys

# Supabase configuration
SUPABASE_URL = "https://hxqqswjevxuollcgxbzg.supabase.co"
SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cXFzd2pldnh1b2xsY2d4YnpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTUyMzQ1NiwiZXhwIjoyMDc3MDk5NDU2fQ.z1R7KvQ9NiABVBIT1iIEiKURFqkmeb9Ip7X-iNN-mGo"

def load_exercises_to_supabase(exercises):
    """Load exercises to Supabase via REST API"""
    
    url = f"{SUPABASE_URL}/rest/v1/exercises"
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    
    # Load in batches of 50 to avoid size limits
    batch_size = 50
    total_loaded = 0
    failed = 0
    
    for i in range(0, len(exercises), batch_size):
        batch = exercises[i:i+batch_size]
        
        try:
            response = requests.post(url, headers=headers, json=batch)
            
            if response.status_code in [200, 201]:
                total_loaded += len(batch)
                print(f"✅ Loaded batch {i//batch_size + 1}: {len(batch)} exercises")
            else:
                print(f"❌ Failed to load batch {i//batch_size + 1}")
                print(f"   Status: {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                failed += len(batch)
                
        except Exception as e:
            print(f"❌ Error loading batch {i//batch_size + 1}: {e}")
            failed += len(batch)
    
    return total_loaded, failed

def main():
    print("=" * 70)
    print("LOADING NEW GREEK EXERCISES (1-80) INTO DATABASE")
    print("=" * 70)
    
    # Load the exercises JSON file
    json_file = '/workspace/docs/greek_content/greek_exercises_1-80.json'
    
    print(f"\n📂 Loading exercises from: {json_file}")
    
    with open(json_file, 'r', encoding='utf-8') as f:
        exercises = json.load(f)
    
    print(f"✅ Loaded {len(exercises)} exercises from JSON file\n")
    
    # Verify exercise distribution
    beginner_count = sum(1 for ex in exercises if ex['difficulty_level'] == 'beginner')
    intermediate_count = sum(1 for ex in exercises if ex['difficulty_level'] == 'intermediate')
    
    print(f"📊 Exercise distribution:")
    print(f"   Beginner (1-30): {beginner_count} exercises")
    print(f"   Intermediate (31-65): {intermediate_count} exercises")
    print(f"   Total: {len(exercises)} exercises\n")
    
    # Load to database
    print("🚀 Starting upload to Supabase...\n")
    
    loaded, failed = load_exercises_to_supabase(exercises)
    
    print("\n" + "=" * 70)
    print("UPLOAD COMPLETE")
    print("=" * 70)
    print(f"✅ Successfully loaded: {loaded} exercises")
    if failed > 0:
        print(f"❌ Failed to load: {failed} exercises")
    print(f"📊 Success rate: {(loaded / len(exercises) * 100):.1f}%")
    
    # Verify database state
    print("\n🔍 Verifying database state...")
    
    verify_url = f"{SUPABASE_URL}/rest/v1/exercises?language=eq.greek&select=difficulty_level&limit=1000"
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}"
    }
    
    try:
        response = requests.get(verify_url, headers=headers)
        if response.status_code == 200:
            all_greek = response.json()
            
            # Count by difficulty
            difficulty_counts = {}
            for ex in all_greek:
                diff = ex['difficulty_level']
                difficulty_counts[diff] = difficulty_counts.get(diff, 0) + 1
            
            print(f"\n📊 Database now contains:")
            for level in ['beginner', 'intermediate', 'advanced', 'expert', 'master']:
                count = difficulty_counts.get(level, 0)
                print(f"   {level.capitalize()}: {count} exercises")
            print(f"   TOTAL GREEK EXERCISES: {len(all_greek)}")
            
            if len(all_greek) >= 145:
                print(f"\n🎉 SUCCESS! Database now has {len(all_greek)} Greek exercises!")
                print(f"✅ Greek curriculum complete across all 5 difficulty levels!")
            else:
                print(f"\n⚠️  Warning: Expected 145+ exercises, found {len(all_greek)}")
                
    except Exception as e:
        print(f"❌ Could not verify database state: {e}")
    
    return 0 if failed == 0 else 1

if __name__ == '__main__':
    sys.exit(main())
