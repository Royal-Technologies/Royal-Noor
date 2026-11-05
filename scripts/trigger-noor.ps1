# ============================================================
# Royal Noor — Trigger Daily Generation Script
# Royal Technologies (https://www.royaltechbd.com/)
# ============================================================

$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path
$ROOT_DIR   = Split-Path -Parent $SCRIPT_DIR
$PAT_FILE   = Join-Path $SCRIPT_DIR ".pat"
$LOG_FILE   = Join-Path $ROOT_DIR "trigger.log"

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Check if GitHub PAT exists to trigger GitHub Action, else run locally
if (Test-Path $PAT_FILE) {
    $pat = (Get-Content $PAT_FILE -Raw).Trim()
    $headers = @{
        "Authorization" = "Bearer $pat"
        "Accept"        = "application/vnd.github.v3+json"
        "User-Agent"    = "RoyalNoor-Scheduler"
    }

    $body = @{
        event_type = "generate-noor"
    } | ConvertTo-Json

    try {
        $resp = Invoke-RestMethod `
            -Uri "https://api.github.com/repos/Royal-Technologies/Royal-Noor/dispatches" `
            -Method Post `
            -Headers $headers `
            -Body $body
        Add-Content -Path $LOG_FILE -Value "[$timestamp] GitHub dispatch triggered successfully."
    } catch {
        Add-Content -Path $LOG_FILE -Value "[$timestamp] GitHub dispatch error: $_. Falling back to local."
        & "D:\laragon\bin\nodejs\node-v22\node.exe" (Join-Path $SCRIPT_DIR "generate-noor.js") *>> $LOG_FILE
    }
} else {
    & "D:\laragon\bin\nodejs\node-v22\node.exe" (Join-Path $SCRIPT_DIR "generate-noor.js") *>> $LOG_FILE
}
