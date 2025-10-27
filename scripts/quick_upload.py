import json
import requests
import sys

# Load exercises
print("Loading exercises JSON...", file=sys.stderr)
with open('/workspace/docs/greek_content/greek_exercises_1-80.json', 'r') as f:
    exercises = json.load(f)

print(f"Loaded {len(exercises)} exercises", file=sys.stderr)

# Upload to Supabase  
url = "https://hxqqswjevxuollcgxbzg.supabase.co/rest/v1/exercises"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cXFzd2pldnh1b2xsY2d4YnpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTUyMzQ1NiwiZXhwIjoyMDc3MDk5NDU2fQ.z1R7KvQ9NiABVBIT1iIEiKURFqkmeb9Ip7X-iNN-mGo"

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

# Upload in batches
batch_size = 50
success = 0
failed = 0

for i in range(0, len(exercises), batch_size):
    batch = exercises[i:i+batch_size]
    try:
        resp = requests.post(url, headers=headers, json=batch, timeout=30)
        if resp.status_code in [200, 201]:
            success += len(batch)
            print(f"✅ Batch {i//batch_size + 1} uploaded: {len(batch)} exercises", file=sys.stderr)
        else:
            failed += len(batch)
            print(f"❌ Batch {i//batch_size + 1} FAILED: {resp.status_code}", file=sys.stderr)
            print(f"   Error: {resp.text[:200]}", file=sys.stderr)
    except Exception as e:
        failed += len(batch)
        print(f"❌ Batch {i//batch_size + 1} ERROR: {e}", file=sys.stderr)

print(f"\n✅ Total uploaded: {success}/{len(exercises)}", file=sys.stderr)
print(f"❌ Failed: {failed}", file=sys.stderr)

# Write summary to file
with open('/workspace/upload_results.txt', 'w') as f:
    f.write(f"Uploaded: {success}\nFailed: {failed}\nTotal: {len(exercises)}\n")
