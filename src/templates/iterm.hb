<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
{{#each colors}}
<key>{{ this.name }}</key>
<dict>
  <key>Blue Component</key>
  <real>{{ this.color.b }}</real>
  <key>Green Component</key>
  <real>{{ this.color.g }}</real>
  <key>Red Component</key>
  <real>{{ this.color.r }}</real>
</dict>
{{/each}}
</dict>
</plist>
