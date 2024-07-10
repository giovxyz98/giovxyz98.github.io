import os
import glob

# Directory contenente le immagini
image_dir = r'C:\Users\Giovanni\Desktop\HTML\github pages\giovxyz98.github.io\images'

# Trova tutte le immagini nella cartella specificata (puoi specificare i tipi di file se necessario, es: "*.jpg" o "*.png")
image_files = glob.glob(os.path.join(image_dir, "*"))

# Ordina i file per essere sicuro che vengano rinominati in ordine
image_files.sort()

# Rinomina i file
for i, file_path in enumerate(image_files):
    # Estrae l'estensione del file
    file_extension = os.path.splitext(file_path)[1]
    
    # Crea il nuovo nome del file
    new_name = f"art_{i}{file_extension}"
    
    # Crea il percorso completo del nuovo file
    new_file_path = os.path.join(image_dir, new_name)
    
    # Rinomina il file
    os.rename(file_path, new_file_path)

print("Rinomina completata.")
