# ============================================================
# Royal Noor — Windows Task Scheduler Setup
# Royal Technologies (https://www.royaltechbd.com/)
# ============================================================
# Run ONCE as Administrator to register daily triggers:
#   ► সকাল ৫:৩০ AM (ফজর / সকালের নূর)
#   ► দুপুর ১২:২০ PM (দুপুরের নূর)
#   ► বিকাল ৫:৪৫ PM (মাগরিব / সন্ধ্যার নূর)
# ============================================================

param(
    [string]$GitHubPAT = ""
)

if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
    [Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "❌ Administrator হিসেবে চালাতে হবে!" -ForegroundColor Red
    Write-Host "   PowerShell -এ Right-click → 'Run as Administrator'" -ForegroundColor Yellow
    exit 1
}

$SCRIPT_DIR  = Split-Path -Parent $MyInvocation.MyCommand.Path
$TRIGGER_PS1 = Join-Path $SCRIPT_DIR "trigger-noor.ps1"
$PAT_FILE    = Join-Path $SCRIPT_DIR ".pat"
$TASK_BASE   = "RoyalNoor_Daily"

Write-Host ""
Write-Host "╔══════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Royal Noor — Scheduler Setup               ║" -ForegroundColor Cyan
Write-Host "║   Royal Technologies (royaltechbd.com)       ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

if (-not $GitHubPAT) {
    if (Test-Path $PAT_FILE) {
        $GitHubPAT = Get-Content $PAT_FILE -Raw | ForEach-Object { $_.Trim() }
        Write-Host "✔ বিদ্যমান PAT ফাইল পাওয়া গেছে।" -ForegroundColor Green
    } else {
        Write-Host "🔑 GitHub PAT দেওয়া না থাকলে সরাসরি লোকাল জেনারেটর রান হবে।" -ForegroundColor Gray
    }
}

if ($GitHubPAT -and -not (Test-Path $PAT_FILE)) {
    Set-Content -Path $PAT_FILE -Value $GitHubPAT -NoNewline
    Write-Host "✔ PAT সংরক্ষিত হয়েছে: scripts/.pat" -ForegroundColor Green
}

$triggers = @(
    @{ Time = "05:30"; Desc = "ফজর ও সকালের নূর" },
    @{ Time = "12:20"; Desc = "দুপুরের নূর" },
    @{ Time = "17:45"; Desc = "মাগরিব ও সন্ধ্যার নূর" }
)

foreach ($t in $triggers) {
    $timeClean = $t.Time.Replace(":", "")
    $taskName  = "${TASK_BASE}_${timeClean}"

    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

    $action = New-ScheduledTaskAction `
        -Execute "powershell.exe" `
        -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$TRIGGER_PS1`""

    $trigger = New-ScheduledTaskTrigger -Daily -At $t.Time

    $settings = New-ScheduledTaskSettingsSet `
        -StartWhenAvailable `
        -AllowStartIfOnBatteries `
        -DontStopIfGoingOnBatteries `
        -ExecutionTimeLimit (New-TimeSpan -Minutes 10)

    Register-ScheduledTask `
        -TaskName $taskName `
        -Action $action `
        -Trigger $trigger `
        -Settings $settings `
        -Description "Royal Noor daily generation — $($t.Desc)" | Out-Null

    Write-Host "✔ শিডিউল রেজিস্টার হয়েছে: $taskName ($($t.Time) — $($t.Desc))" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 শিডিউলার সেটআপ সফল হয়েছে!" -ForegroundColor Cyan
