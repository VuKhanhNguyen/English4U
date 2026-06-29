import json
import os
import re

# Determine directories relative to script location
script_dir = os.path.dirname(os.path.abspath(__file__))
workspace_dir = os.path.dirname(os.path.dirname(script_dir))
translation_file_path = os.path.join(workspace_dir, "src", "data", "vocab-translation-vi-b2.json")

def migrate():
    print(f"Workspace directory: {workspace_dir}")
    print(f"Translation file path: {translation_file_path}")
    
    if not os.path.exists(translation_file_path):
        print("Error: Translation file not found!")
        return

    # 1. Load translation file
    with open(translation_file_path, "r", encoding="utf-8") as f:
        translations = json.load(f)

    # 2. Find all unit vocabulary word-to-meaning maps
    unit_vocab_maps = {}
    for unit_num in range(2, 29):
        unit_file = os.path.join(workspace_dir, "src", "data", "b2", f"unit{unit_num}.json")
        if os.path.exists(unit_file):
            with open(unit_file, "r", encoding="utf-8") as uf:
                unit_data = json.load(uf)
                vocab_list = unit_data.get("vocabulary", [])
                word_to_meaning = {}
                for item in vocab_list:
                    word = item.get("word")
                    meaning = item.get("meaning")
                    if word and meaning:
                        word_to_meaning[word.strip()] = meaning.strip()
                unit_vocab_maps[unit_num] = word_to_meaning
                print(f"Loaded Unit {unit_num} vocabulary: {len(word_to_meaning)} items")

    # 3. Iterate over the translation dict keys and determine current unit
    current_unit = None
    new_translations = {}
    replaced_count = 0
    
    for key, value in translations.items():
        # Check if this key is a unit comment
        # e.g., __B2_UNIT_2_VOCAB_COMMENT__
        match = re.match(r"^__B2_UNIT_(\d+)_[A-Z_]+_COMMENT__$", key)
        if match:
            unit_num = int(match.group(1))
            current_unit = unit_num

        # If we are in units 2 to 28, check if the key is a vocabulary word of the current unit
        if current_unit and 2 <= current_unit <= 28:
            vocab_map = unit_vocab_maps.get(current_unit, {})
            if key in vocab_map:
                meaning = vocab_map[key]
                new_translations[meaning] = value
                replaced_count += 1
            else:
                new_translations[key] = value
        else:
            new_translations[key] = value

    # 4. Save updated translations back
    with open(translation_file_path, "w", encoding="utf-8") as f:
        json.dump(new_translations, f, ensure_ascii=False, indent=2)
    
    print(f"Migration completed successfully! Replaced {replaced_count} vocabulary keys.")

if __name__ == "__main__":
    migrate()
