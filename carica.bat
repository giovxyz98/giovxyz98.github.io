call npm run build
if errorlevel 1 (
    echo ERRORE: npm run build fallito.
    pause
    exit /b 1
)

git add .

git commit -m "Deploy sito"

git push origin main
if errorlevel 1 (
    echo ERRORE: git push fallito. Controlla sopra il motivo.
    pause
    exit /b 1
)

echo Caricato con successo su GitHub.
pause