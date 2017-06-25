

#Grofit#
This discord project is used to monitor text channels and remove messages that do not follow a standard format.

It uses 2 regular expressions to decide if the format is respected. The "white" regex must match in the message for it to be tolerated. The "black" regex must not hit anywhere for the message to be tolerated. A message is only tolerated if both the white and black regex pass their test.

##Install##
1. Install node.js on your machine
2. Clone this directory
3. Create a "key.txt" file in the root folder and write the discord login token of your bot.
4. Create a "owner.txt" file in the root folder and write the discord id of the bot owner.

##Commands##

###regulate###
Applies the rules to the channel passed as an argument.  Accepts more than one channel at a time. ( Admin only )

Aliases : **rg**

Syntax: `regulate #tradeChannel`

###deregulate###
Removes the effect of `regulate`. The text channel passed as an argument will no longer be affected by the bot. If `all` is passed as an argument, all the text channels will be cleared. ( Admin only )

Aliases : **drg**

Syntax: `deregulate #tradeChannel .. | all`

###list_regulated###
Prints a list of all the regulated channels on the server. This command can be ran by anyone.

Aliases : **lr**

Syntax: `list_regulated`

###regulation_blacklist###
Sets the regular expression that valid messages should not match. Calling this function without arguments simply displays the current regular expression ( Any user ). Regular expressions must follow javascript standards. Typing `disable` as an argument will disable the "black" filter. ( Admin only )

Aliases : **rbl**

Syntax: `regulation_blacklist /regex/mods | disable`

###regulation_whitelist###
Sets the regular expression that valid messages must match. Calling this function without arguments simply displays the current regular expression ( Any user ). Regular expressions must follow javascript standards. Typing `disable` as an argument will disable the "white" filter. ( Admin only )

Aliases : **rwl**

Syntax: `regulation_whitelist /regex/mods | disable`

###regulation_message###
Change the message sent to those who post messages that do not respect the format in trade chat. If no argument is provided, the message will be reset to default.( Admin only )

Aliases : **rgm**

Syntax: `regulation_message message`

