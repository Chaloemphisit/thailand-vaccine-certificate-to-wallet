#!/bin/bash
#
# Automatically adds branch name and branch description to every commit message.
# Modified from the gist here https://gist.github.com/bartoszmajsak/1396344
#
# This way you can customize which branches should be skipped when
# prepending commit message. 
if [ -z "$BRANCHES_TO_SKIP" ]; then
  BRANCHES_TO_SKIP=(master main)
fi
# Get Jira ticket name from branch name
TICKET_NAME=$(git branch | grep '*' | grep -o '\*.\(.*/\)*\([A-Z]*-[a-zA-Z0-9]*\)' | sed 's/\*.\(.*\/\)//')
# Branch name should be excluded from the prepend
BRANCH_EXCLUDED=$(printf "%s\n" "${BRANCHES_TO_SKIP[@]}" | grep -c "^$TICKET_NAME$")
# A developer has already prepended the commit in the format [BRANCH_NAME]
TICKET_IN_COMMIT=$(grep -c "\[$TICKET_NAME\]" $1)
if [ -n "$TICKET_NAME" ] && ! [[ $BRANCH_EXCLUDED -eq 1 ]] && ! [[ $TICKET_IN_COMMIT -ge 1 ]]; then 
  sed -i.bak -e "1s~^~[$TICKET_NAME] ~" $1
fi