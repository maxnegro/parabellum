#!/usr/bin/perl

use strict;
use warnings;
use Text::CSV;
use Data::Dumper;


my %provinces;
my %barbarians;
my %seas;

my $csv = Text::CSV->new ({sep_char => ";"});

open (my $f, "<", "province.csv") or die "Can't open province.csv: $!";
$csv->column_names($csv->getline($f));
while (my $row=$csv->getline_hr($f)) {
    $row->{slotX}-=24;
    $row->{slotY}-=24;
    my %borders=map {($_,{})} split(/,/,$row->{landBorders});
    my %docks=map {($_,{})} split(/,/,$row->{seas});
    my %barbarians=map {($_,{})} split(/,/,$row->{barbarians});
    $provinces{$row->{ID}}={
        name        => $row->{name},
        support     => $row->{support},
        borders     => \%borders,
        docks       => \%docks,
        barbarians  => \%barbarians,
        slot        => {
            x       => $row->{slotX},
            y       => $row->{slotY},
            dir     => $row->{dir},
        },
    };
}
close $f;

open ($f, "<", "barbarians.csv") or die "Can't open barbarians.csv: $!";
$csv->column_names($csv->getline($f));
while (my $row=$csv->getline_hr($f)) {
    my %attack=map {($_,{})} grep {my $p=$_; grep {$_==$row->{ID}} keys %{$provinces{$p}{barbarians}}} sort keys %provinces;
    $barbarians{$row->{ID}}={
        name        => $row->{name},
        attack      => \%attack
    };
}
close $f;
foreach my $p (keys %provinces) {
    foreach my $b (keys %{$provinces{$p}{barbarians}}) {
        print "**** Unknown barbarians ID $b in province $p\n" unless exists $barbarians{$b}
    }
}

open ($f, "<", "seas.csv") or die "Can't open seas.csv: $!";
$csv->column_names($csv->getline($f));
while (my $row=$csv->getline_hr($f)) {
    $row->{slotY}-=84;
    my %docks=map {($_,{})} grep {my $p=$_; grep {$_==$row->{ID}} keys %{$provinces{$p}{docks}}} sort keys %provinces;
    $seas{$row->{ID}}={
        name        => $row->{name},
        docks       => \%docks,
        slot        => {
            x       => $row->{slotX},
            y       => $row->{slotY},
            dir     => $row->{dir},
        },
    };
}
close $f;
foreach my $p (keys %provinces) {
    foreach my $d (keys %{$provinces{$p}{docks}}) {
        print "**** Unknown dock ID $d in province $p\n" unless exists $seas{$d}
    }
}

open ($f, "<", "borders.csv") or die "Can't open borders.csv: $!";
$csv->column_names($csv->getline($f));
while (my $row=$csv->getline_hr($f)) {
    $row->{slotX}-=24;
    $row->{slotY}-=24;
    if ($row->{prov1}>0) {
        $provinces{$row->{prov1}}{borders}{$row->{prov2}}={
            x       => $row->{slotX},
            y       => $row->{slotY},
            angle   => $row->{angle},
        };
        $provinces{$row->{prov2}}{borders}{$row->{prov1}}={
            x       => $row->{slotX},
            y       => $row->{slotY},
            angle   => ($row->{angle}+180)%360,
        };
    } else {
        $barbarians{-$row->{prov1}}{attack}{$row->{prov2}}={
            x       => $row->{slotX},
            y       => $row->{slotY},
            angle   => $row->{angle},
        };
        $provinces{$row->{prov2}}{barbarians}{-$row->{prov1}}={
            x       => $row->{slotX},
            y       => $row->{slotY},
            angle   => ($row->{angle}+180)%360,
        };
    }
}
close $f;
foreach my $p (keys %provinces) {
    foreach my $b (keys %{$provinces{$p}{borders}}) {
        print "**** Unknown border $b in province $p\n" unless $provinces{$p}{borders}{$b}{x}
    }
}
foreach my $p (keys %provinces) {
    foreach my $b (keys %{$provinces{$p}{barbarians}}) {
        print "**** Unknown border -$b in province $p\n" unless $provinces{$p}{barbarians}{$b}{x}
    }
}

open ($f, "<", "docks.csv") or die "Can't open docks.csv: $!";
$csv->column_names($csv->getline($f));
while (my $row=$csv->getline_hr($f)) {
    $row->{slotX}-=42;
    $row->{slotY}-=42;
    $provinces{$row->{prov}}{docks}{$row->{sea}}={
        x       => $row->{slotX},
        y       => $row->{slotY},
    };
    $seas{$row->{sea}}{docks}{$row->{prov}}={
        x       => $row->{slotX},
        y       => $row->{slotY},
    };
}
close $f;
foreach my $p (keys %provinces) {
    foreach my $d (keys %{$provinces{$p}{docks}}) {
        print "**** Unknown dock $d in province $p\n" unless $provinces{$p}{docks}{$d}{x}
    }
}
foreach my $s (keys %seas) {
    foreach my $d (keys %{$seas{$s}{docks}}) {
        print "**** Unknown dock $d in sea $s\n" unless $seas{$s}{docks}{$d}{x}
    }
}

open ($f, ">", "material.inc.php") or die "Can't open material.inc.php: $!";
print $f '$this->provinces = array('."\n";
foreach my $ID (sort {$a<=>$b} keys %provinces) {
    print $f "    $ID => array(\n";
    print $f "        'name'=>       '$provinces{$ID}{name}',\n";
    print $f "        'support'=>    $provinces{$ID}{support},\n";
    print $f "        'docks'=>      [".join(',',sort keys %{$provinces{$ID}{docks}})."],\n";
    print $f "        'barbarians'=> [".join(',',sort keys %{$provinces{$ID}{barbarians}})."],\n";
    print $f "        'borders'=>    [".join(',',sort keys %{$provinces{$ID}{borders}})."],\n";
    print $f "    ),\n";
}
print $f ");\n";
print $f "\n";
print $f '$this->barbarians = array('."\n";
foreach my $ID (sort {$a<=>$b} keys %barbarians) {
    print $f "    $ID => array(\n";
    print $f "        'name'=>       '$barbarians{$ID}{name}',\n";
    print $f "        'attack'=>     [".join(',',sort keys %{$barbarians{$ID}{attack}})."],\n";
    print $f "    ),\n";
}
print $f ");\n";
print $f "\n";
print $f '$this->seas = array('."\n";
foreach my $ID (sort {$a<=>$b} keys %seas) {
    print $f "    $ID => array(\n";
    print $f "        'name'=>       '$seas{$ID}{name}',\n";
    print $f "        'docks'=>      [".join(',',sort keys %{$seas{$ID}{docks}})."],\n";
    print $f "    ),\n";
}
print $f ");\n";
print $f "\n";

open ($f, ">", "board.js") or die "Can't open board.js: $!";
print $f "var provinces={\n";
foreach my $ID (sort {$a<=>$b} keys %provinces) {
    print $f "    '$ID':{\n";
    print $f "        'name':       '$provinces{$ID}{name}',\n";
    print $f "        'support':    $provinces{$ID}{support},\n";
    print $f "        'slot':       {'x':$provinces{$ID}{slot}{x}, 'y':$provinces{$ID}{slot}{y}, 'dir':'$provinces{$ID}{slot}{dir}'},\n";
    print $f "        'docks':      {\n";
    foreach my $d (sort {$a<=>$b} keys %{$provinces{$ID}{docks}}) {
        print $f "            '$d':{\n";
        print $f "                'slot':       {'x':$provinces{$ID}{docks}{$d}{x}, 'y':$provinces{$ID}{docks}{$d}{y}},\n";
        print $f "            },\n";
    }
    print $f "        },\n";
    print $f "        'barbarians':      {\n";
    foreach my $b (sort {$a<=>$b} keys %{$provinces{$ID}{barbarians}}) {
        print $f "            '$b':{\n";
        print $f "                'slot':       {'x':$provinces{$ID}{barbarians}{$b}{x}, 'y':$provinces{$ID}{barbarians}{$b}{y}, 'angle':$provinces{$ID}{barbarians}{$b}{angle}},\n";
        print $f "            },\n";
    }
    print $f "        },\n";
    print $f "        'borders':      {\n";
    foreach my $b (sort {$a<=>$b} keys %{$provinces{$ID}{borders}}) {
        print $f "            '$b':{\n";
        print $f "                'slot':       {'x':$provinces{$ID}{borders}{$b}{x}, 'y':$provinces{$ID}{borders}{$b}{y}, 'angle':$provinces{$ID}{borders}{$b}{angle}},\n";
        print $f "            },\n";
    }
    print $f "        },\n";
    print $f "    },\n";
}
print $f "};\n";
print $f "\n";

print $f "var seas={\n";
foreach my $ID (sort {$a<=>$b} keys %seas) {
    print $f "    '$ID':{\n";
    print $f "        'name':       '$seas{$ID}{name}',\n";
    print $f "        'slot':       {'x':$seas{$ID}{slot}{x}, 'y':$seas{$ID}{slot}{y}, 'dir':'$seas{$ID}{slot}{dir}'},\n";
    print $f "        'docks':      {\n";
    foreach my $d (sort {$a<=>$b} keys %{$seas{$ID}{docks}}) {
        print $f "            '$d':{\n";
        print $f "                'slot':       {'x':$seas{$ID}{docks}{$d}{x}, 'y':$seas{$ID}{docks}{$d}{y}},\n";
        print $f "            },\n";
    }
    print $f "        },\n";
    print $f "    },\n";
}
print $f "};\n";
print $f "\n";

print $f "var barbarians={\n";
foreach my $ID (sort {$a<=>$b} keys %barbarians) {
    print $f "    '$ID':{\n";
    print $f "        'name':       '$barbarians{$ID}{name}',\n";
    print $f "        'attack':     {\n";
    foreach my $d (sort {$a<=>$b} keys %{$barbarians{$ID}{attack}}) {
        print $f "            '$d':{\n";
        print $f "                'slot':       {'x':$barbarians{$ID}{attack}{$d}{x}, 'y':$barbarians{$ID}{attack}{$d}{y}, 'angle':$barbarians{$ID}{attack}{$d}{angle}},\n";
        print $f "            },\n";
    }
    print $f "        },\n";
    print $f "    },\n";
}
print $f "};\n";
print $f "\n";



close $f;
